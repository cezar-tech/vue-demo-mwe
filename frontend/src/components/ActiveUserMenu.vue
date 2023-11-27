<template>
  <TabMenu :model="getMenuUsers()"/>
  <div v-if="$route.params.user" class="card">
    <h5>Current user: {{ $route.params.user }}</h5>
    <Avatar :image="getImgUrl($route.params.user)" size="xlarge"/>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils/img-utils";
import Avatar from "primevue/avatar";
import TabMenu from "primevue/tabmenu";

export default {
  name: "ActiveUserMenu",
  //the initial value of props is always constant, see setup(props)
  props: {
    users: [String]
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
              command: () => {
                this.$router.push(`/ashero/${user}`);
              }
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
