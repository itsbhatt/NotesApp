<template>
  <div>
    <div class="menu">
      <button @click="openModal">
        <img src="/static/icons/add.svg" alt="" />
      </button>
      <h1>Notes</h1>
    </div>

    <Modal v-if="showModal" :noteData="noteData" />
  </div>
</template>

<script>
import Modal from "../Modal/Modal.vue";
import { bus } from "../../main";

export default {
  name: "Menu",
  components: {
    Modal,
  },
  data() {
    return {
      count: 0,
      showModal: false,
      noteData: {},
    };
  },
  created() {
    bus.$on("closeModal", () => {
      this.showModal = false;
    });
    bus.$on("openModal", (data) => {
      this.showModal = true;
      this.noteData = data;
    });
  },
  methods: {
    openModal() {
      bus.$emit("openModal", { type: "create" });
    },
  },
};
</script>

<style scoped>
.menu {
  padding: 20px;
  display: grid;
  grid-template-columns: 40px auto;
  text-align: left;
  grid-gap: 20px;
  align-items: center;
  border-bottom: 1px solid #c0c0c0;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.2);
}
.menu h1 {
  margin: 0;
  font-size: 20px;
}
.menu > button {
  outline: none;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff6341;
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin: auto;
  position: fixed;
  bottom: 5%;
  right: 8%;
  cursor: pointer;
  transition: all 0.2s;
}

.menu > button img {
  width: 35px;
}

.menu > button:hover {
  background: #f03f17;
  box-shadow: 0px 0px 10px 1px rgb(0, 0, 0, 20%);
  border-color: #ffffff;
}

@media (min-width: 500px) {
  .menu {
    border-right: 1px solid #dddddd;
    box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 35px 0;
    height: 100%;
    text-align: center;
    display: block;
    border-bottom: none;
  }
  .menu > button {
    width: 60px;
    height: 60px;
    position: static;
  }

  .menu h1 {
    display: none;
  }
}
</style>
