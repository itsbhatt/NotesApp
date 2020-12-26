<template>
  <div class="modalContainer">
    <AddNote :noteData="noteData" />
    <div class="backDrop" @click="closeModal"></div>
  </div>
</template>

<script>
import AddNote from "./AddNote.vue";
import { bus } from "../../main";

export default {
  name: "Modal",
  components: {
    AddNote,
  },
  props: {
    noteData: Object,
  },
  data() {
    return {
      note: {},
    };
  },
  methods: {
    closeModal() {
      bus.$emit("closeModal");
    },
  },
};
</script>

<style>
.modalContainer {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modalContainer > div {
  z-index: 1800;
}

.modalContainer > div.backDrop {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1500;
  background: rgba(0, 0, 0, 0.7);
}

@media (min-width: 500px) {
}
</style>
