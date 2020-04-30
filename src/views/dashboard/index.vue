<template>
  <div class="dashboard-container">

  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'Dashboard',

  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {

  }
}
</script>
