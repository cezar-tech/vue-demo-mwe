<template>
  <TabMenu :model="getMenuUsers()"/>
  <div v-if="$route.params.user" class="card">
    <h5>Current user: {{ $route.params.user }}</h5>
    <Avatar :image="getImgUrl($route.params.user)" size="xlarge"/>
  </div>
</template>

<script>
import {getImgUrl} from "@/utils/img-utils";
import TabMenu from "primevue/tabmenu";
import Avatar from "primevue/avatar";

export default {
  name: "ActiveUserMenu",
  //the initial value of props is always constant, see setup(props)
  props: {
    users: []
  },
  components: {
    TabMenu, Avatar
  },
  methods: {
    getMenuUsers() {
      return this.users.map(user => {
            return {
              label: user,
              icon: this.getImgUrl(user),
              to: `/ashero/${user}`
            };
          }
      );
    },
    getImgUrl
  }
}
</script>

<style scoped>

</style>
