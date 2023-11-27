<template>
  <DataTable :value="socialMediaObj.comments" :paginator="true" :rows="5"
             dataKey="id" class="p-datatable-sm"
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
    <Column field="comment" header="Comentário"></Column>
    <Column field="user" header="Usuário"></Column>
    <Column field="userImg" header="Foto">
      <template #body="slotProps">
        <img :src="getImgUrl(slotProps.data.user)" :alt="`${slotProps.data.user}'s image`">
      </template>
    </Column>
  </DataTable>
  <div v-if="$route.params.user" class="card">
    <h5>Current user: {{ $route.params.user }}</h5>
    <span class="p-input-icon-left p-inputtext-lg">
        <img :src="getImgUrl($route.params.user)" :alt="`${$route.params.user}'s image`">
        <InputText type="text" v-model="typedComment" :placeholder="`Comment as ${$route.params.user}`"
                   @keyup.enter="addComment($route.params.user)"/>
    </span>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils/img-utils";
import { ref } from "@vue/reactivity";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";

export default {
  name: "CommentsSection",
  //Injected by whoever uses this component
  props: {
    socialMediaObj: {}
  },
  data() {
    return {
      typedComment: null
    }
  },
  components: {
    DataTable, Column, InputText
  },
  methods: {
    getImgUrl,
    addComment(hero) {
      this.reactiveComments.push({
        comment: this.typedComment,
        user: hero,
        postId: this.socialMediaObj.post.postId
      });
    }
  },
  setup(props) {
    const reactiveComments = ref(props.socialMediaObj.comments);
    return {reactiveComments};
  }
}

</script>

<!-- Adds "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  border-radius: 60px;
  max-width: 2em;
  max-height: 2em;
}
</style>
