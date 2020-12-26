<template>
  <div class="main">
    <div class="menuBar">
      <h1>NOTES</h1>
    </div>

    <div class="notes">
      <div
        v-for="note in notes"
        v-bind:key="note._id"
        v-bind:style="{ background: note.background }"
        class="noteContainer"
        @click="openNote(note)"
      >
        <h3>{{ note.text }}</h3>
        <span class="timestamp">{{
          note.updatedAt | moment("ddd, Do MMM, hh:mm A")
        }}</span>
      </div>
    </div>

    <div class="loading" v-if="!loaded">
      <h3>Loading...</h3>
    </div>

    <div class="loading" v-if="loaded && notes.length == 0">
      <h3>Please add a note.</h3>
    </div>
  </div>
</template>

<script>
import { bus } from "../../main";

export default {
  name: "Main",
  data: () => ({
    notes: [],
    loaded: false,
  }),
  created() {
    bus.$on("addNote", (note) => {
      this.notes.unshift(note);
    });

    bus.$on("updateNote", ({ id, text }) => {
      this.notes.forEach((note, key) => {
        if (id == note._id) {
          return (this.notes[key].text = text);
        }
      });
    });

    bus.$on("deleteNote", (id) => {
      this.notes.forEach((note, key) => {
        if (id == note._id) {
          return this.notes.splice(key, 1);
        }
      });
    });
  },
  async beforeMount() {
    try {
      const res = await fetch(`${process.env.PROXY}`);
      const data = await res.json();
      this.notes = [...data];
      this.loaded = true;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addNote() {
      this.encoded = encode(this.count);
      this.decoded = decode(this.encoded);
    },

    openNote(note) {
      bus.$emit("openModal", { ...note, type: "update" });
    },
  },
};
</script>

<style scoped>
.main {
  overflow-y: scroll;
}

.menuBar {
  display: flex;
  align-items: center;
  padding: 25px 60px;
  margin-bottom: 15px;
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 900;
}

.menuBar h1 {
  display: none;
}

.notes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  /* align-items: start; */
  grid-gap: 22px;
  padding: 25px;
}

.noteContainer {
  border-radius: 15px;
  padding: 20px 15px;
  min-height: 120px;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease-in;
  white-space: pre-line;
}

.noteContainer:hover {
  transform: scale(1.05);
}

.timestamp {
  position: absolute;
  bottom: 5px;
  right: 15px;
  font-size: 13px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.loading h3 {
  font-size: 23px;
}

@media (min-width: 500px) {
  .menuBar h1 {
    font-size: 30px;
    font-weight: 500;
    display: block;
  }
}
</style>
