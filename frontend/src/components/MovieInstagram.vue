<template>
  <div class="hello">
    <h1>MovieInstagram</h1>
  </div>
  <Loader v-if="isLoading()"></Loader>
  <Card
      v-for="(socialMediaObj, pIndex) in socialMedia" :key="pIndex">
    <template #header
              :href="socialMediaObj.post.picture">
      <a :href="socialMediaObj.post.picture">
        <img :src="socialMediaObj.post.picture">
      </a>
    </template>
    <template #title>{{ socialMediaObj.post.title }}</template>
    <template #subtitle>
      <div class="post-info">
        <div class="info-item">Usuário: {{ socialMediaObj.post.user }}</div>
        <div class="pi pi-heart info-item" :title="getPostLikes(socialMediaObj.likes)">{{
            socialMediaObj.likes.length
          }}
        </div>
        <div class="pi pi-comments info-item">{{ socialMediaObj.comments.length }}</div>
      </div>
    </template>
    <template #content>
      <DataTable :value="socialMediaObj.comments" :paginator="true" :rows="5"
                 dataKey="id" :rowHover="true"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                 :rowsPerPageOptions="[5,10,15]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
        <template #header>Comments</template>
        <template #empty>
          No comments found.
        </template>
        <template #loading>
          Loading comments. Please wait.
        </template>
        <Column field="comment" header="Comentário">
          <template #body="slotProps">
            <div>{{ slotProps.data.comment }}</div>
          </template>
        </Column>
        <Column field="user" header="Usuário">
          <template #body="slotProps">
            <div>{{ slotProps.data.user }}</div>
          </template>
        </Column>
        <Column field="userImg" header="Foto">
          <template #body="slotProps">
            <img :src="slotProps.data.userImg" :alt="slotProps.data.user">
            <img src="slotProps.data.userImg">
            <img src="../../img/batman.png">
            <img :src="'../../img/' + slotProps.data.user + '.png'">
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script>
import {getBestFriends, getComments, getLikes, getPosts} from "@/service/backend-service";
import Loader from "@/components/Loader";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: 'MovieInstagram',
  data() {
    return {
      posts: [],
      comments: [],
      likes: [],
      bestFriends: [String],
      socialMedia: []
    }
  },
  components: {
    Loader,
    Card, DataTable, Column
  },
  methods: {
    getImgPath(pngName) {
      return `../../img/${pngName}.png`;
      // return "../../img/batman.png";
    },
    getPostLikes(likes) {
      return likes.map(like => like['user'])
          .join("\n");
    },
    isLoading() {
      return this.socialMedia.length !== this.posts.length;
    }
  },
  computed: {
    usersLiked(postId) {
      const obj = this.socialMedia.find(obj => {
        obj.post.id === postId
      });
      return new Set(obj.posts.likes
          .map(like => like.user)
      );
    }
  },
  created() {
    const postsReq = getPosts();
    const commentsReq = getComments();
    const likesReq = getLikes();
    const bestFriendsReq = getBestFriends();

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
      this.comments.forEach(comment => {
        comment['userImg'] = this.getImgPath(comment.user);
      });

      this.posts.forEach(post => {
        const smObj = {};
        smObj["post"] = post;
        smObj["comments"] = this.comments
            .filter(comment => comment.postId === post.id);
        smObj["likes"] = this.likes.filter(like => like.postId === post.id);

        this.socialMedia.push(smObj);
      });

      console.log("Total posts " + this.posts.length);
      console.log("Total comments " + this.comments.length);
      console.log("Total likes " + this.likes.length);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  border-radius: 60px;
  max-width: 25%;
}

img:hover {
  box-shadow: 0 0 2px 5px #4CAF50;
}

.post-info {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
}

.info-item {
  font-weight: bold;
  font-size: 1rem;
  padding: 2em;
}
</style>
