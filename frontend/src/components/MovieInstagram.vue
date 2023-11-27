<template>
  <div class="hello">
    <h1>MovieInstagram</h1>
  </div>
  <Loader v-if="isLoading()"></Loader>
  <div v-if="!isLoading()">
    <ActiveUserMenu :users="uniqueUsers"></ActiveUserMenu>
    <Divider type="solid"/>
    <PostsSection :socialMedia="socialMedia"></PostsSection>
  </div>
</template>

<script>
import ActiveUserMenu from "@/components/ActiveUserMenu";
import Loader from "@/components/Loader";
import PostsSection from "@/components/PostsSection";
import { getBestFriends, getComments, getLikes, getPosts } from "@/service/backend-service";
import { getImgUrl } from "@/utils/img-utils";
import Divider from "primevue/divider";

export default {
  name: 'MovieInstagram',
  data() {
    return {
      posts: [],
      comments: [],
      likes: [],
      bestFriends: [String],
      socialMedia: [],
      uniqueUsers: []
    }
  },
  components: {
    ActiveUserMenu,
    Loader,
    PostsSection,
    Divider
  },
  //Always executes the code to get the return value
  methods: {
    getImgUrl,
    isLoading() {
      //the post is the last thing pushed to guarantee this check
      return this.socialMedia.length !== this.posts.length;
    }
  },
  //like "methods" but caches the response for each input
  computed: {
    usersLiked(postId) {
      const obj = this.socialMedia.find(obj =>
          obj.post.id === postId
      );
      return new Set(obj.posts.likes
          .map(like => like.user)
      );
    }
  },
  // Runs after the component is created
  created() {
    const postsReq = getPosts();
    const commentsReq = getComments();
    const likesReq = getLikes();
    const bestFriendsReq = getBestFriends();
    const uniqueUsersSet = new Set();

    postsReq.then(postsResp => {
      this.posts = postsResp;
    });
    commentsReq.then(commentsResp => {
      this.comments = commentsResp;
    });
    likesReq.then(likesResp => {
      this.likes = likesResp;
    });
    bestFriendsReq.then(bestFriendsResp => {
      this.bestFriends = bestFriendsResp;
    });

    Promise.all([postsReq, commentsReq, likesReq, bestFriendsReq]).then(() => {
      this.posts.forEach(post => {
        const smObj = {};
        smObj["post"] = post;
        smObj["comments"] = this.comments
            .filter(comment => comment.postId === post.id);
        smObj["likes"] = this.likes.filter(like => like.postId === post.id);

        uniqueUsersSet.add(post.user);
        this.comments.forEach(comment => uniqueUsersSet.add(comment.user));
        this.socialMedia.push(smObj);
      });

      this.uniqueUsers = [...uniqueUsersSet.values()];
      console.log("Total users " + this.uniqueUsers.length);
      console.log("Total posts " + this.posts.length);
      console.log("Total comments " + this.comments.length);
      console.log("Total likes " + this.likes.length);
    });
  }
}
</script>

<!-- Adds "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
