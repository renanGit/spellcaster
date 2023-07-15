<template>
    
</template>
  
<script lang="ts">
import { mapState, /** mapActions */ } from 'pinia';
import { useRoomStore } from '@/store/RoomStore'

export default {
  name: "Room",
  components: {
      
  },
  data() {
      return {
      
      };
  },
  computed:
  {
    ...mapState(useRoomStore, {
      roomState: "room"
    })
  },
  watch: {
      
  },
  methods: {
    // ...mapActions(useRoomStore, {

    // })
  }
};
</script>