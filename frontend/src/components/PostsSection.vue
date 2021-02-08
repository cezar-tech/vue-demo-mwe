<template>
  <Card
      v-for="(socialMediaObj, pIndex) in socialMedia" :key="pIndex">
    <template #header
              :href="socialMediaObj.post.picture">
      <a :href="socialMediaObj.post.picture">
        <img class=postImg :src="socialMediaObj.post.picture">
      </a>
    </template>
    <template #title>{{ socialMediaObj.post.title }}</template>
    <template #subtitle>
      <div class="post-info">
        <div class="info-item">Por: {{ socialMediaObj.post.user }}</div>
        <Avatar :image="getImgUrl(socialMediaObj.post.user)" class="p-mr-2" size="xlarge" shape="circle"/>
        <div class="pi pi-heart info-item" :title="getPostLikes(socialMediaObj.likes)">{{
            socialMediaObj.likes.length
          }}
        </div>
        <div class="pi pi-comments info-item" :title="getPostComments(socialMediaObj.comments)">
          {{ socialMediaObj.comments.length }}
        </div>
      </div>
    </template>
    <template #content>
      <CommentsSection :socialMediaObj="socialMediaObj">
      </CommentsSection>
    </template>
  </Card>
</template>

<script>
import {getImgUrl} from "@/utils/img-utils";
import CommentsSection from "@/components/CommentsSection";
import Card from "primevue/card";
import Avatar from "primevue/avatar";

export default {
  name: "Posts",
  components: {
    CommentsSection,
    Card, Avatar
  },
  //Injected by whoever uses this component
  props: {
    socialMedia: []
  },
  methods: {
    getImgUrl,
    getPostLikes(likes) {
      return likes.map(like => like['user'])
          .join("\n");
    },
    getPostComments(comments) {
      return comments.map(comment => comment['user'])
          .join("\n");
    }
  }
}
</script>

<style scoped>
.postImg {
  border-radius: 60px;
  max-width: 25%;
}

.postImg:hover {
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
