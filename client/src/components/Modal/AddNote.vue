<template>
  <div class="addTodoContainer">
    <div class="options" v-if="mode === 'view'">
      <img
        v-if="type !== 'create'"
        class="deleteBtn"
        @click="deleteNote"
        src="/static/icons/delete.svg"
        alt=""
      />
      <img
        v-if="type !== 'create'"
        class="eye"
        @click="toggleVisibility"
        src="/static/icons/visibility_off.svg"
        alt=""
      />
    </div>

    <form @submit.prevent="submitHandler">
      <textarea
        v-model="note"
        v-bind:style="{ background: bgColor }"
        type="text"
        name="todo"
        autocomplete="off"
        autofocus
        :readonly="mode === 'view'"
      ></textarea>
      <div class="todoOptions">
        <div>
          <select name="encryption" v-model="encryption" :disabled="type !== 'create'">
            <option value="" disabled selected>Encryption Type</option>
            <option value="none">None</option>
            <option value="backwards">Backwards</option>
            <option value="letterscramble">Letter-scramble</option>
            <option value="emogize">Emo-gize</option>
          </select>
        </div>
        <button type="submit" v-if="mode === 'edit'">
          <img src="/static/icons/check.svg" alt="submit" />
        </button>
        <p v-if="mode === 'view'" @click="editHandler">
          <img src="/static/icons/edit.svg" alt="" />
        </p>
      </div>
    </form>
    <p v-if="error" class="error">*Input must not be empty</p>
  </div>
</template>

<script>
import colors from "../../utils/colors.json";
import { bus } from "../../main";

export default {
  name: "AddTodo",
  data() {
    return {
      bgColor: "",
      id: "",
      note: "",
      encryptedNote: "",
      decryptedNote: "",
      encryption: "none",
      error: false,
      type: "create",
      mode: "edit",
    };
  },
  props: {
    noteData: Object,
  },
  mounted() {
    if (this.noteData._id) {
      this.bgColor = this.noteData.background;
      this.id = this.noteData._id;
      this.note = this.noteData.text;
      this.encryption = this.noteData.encryption;
      this.type = this.noteData.type;
      this.mode = "view";
    }
  },
  beforeMount() {
    if (!this.bgColor) {
      const colorKey = Math.ceil(Math.random(0) * colors.length - 1);
      this.bgColor = colors[colorKey];
    }
  },
  methods: {
    toggleVisibility(type) {
      const el = document.querySelector(".eye");

      if (el.src.indexOf("visibility_off") > 0 || type == "show") {
        el.src = "/static/icons/visibility.svg";

        if (!this.decryptedNote) {
          this.encryptedNote = this.note;

          this.encryption !== "none" && this.decryptNote();
        } else {
          this.note = this.decryptedNote;
        }
      } else {
        el.src = "/static/icons/visibility_off.svg";

        this.note = this.encryptedNote;
      }
    },

    async submitHandler() {
      if (this.note.trim().length === 0) {
        this.error = true;
        return false;
      }
      this.error = false;

      if (this.type === "create") {
        this.createNote();
      } else {
        this.updateNote();
      }
    },

    async createNote() {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: this.note,
            encryption: this.encryption,
            background: this.bgColor,
          }),
        };

        const res = await fetch("http://localhost:5000/create", requestOptions);
        const data = await res.json();

        bus.$emit("addNote", data.note);

        bus.$emit("closeModal");
      } catch (error) {
        console.log(error);
      }
    },

    async updateNote() {
      try {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: this.note,
            encryption: this.encryption,
          }),
        };

        const res = await fetch(`http://localhost:5000/${this.id}`, requestOptions);
        const data = await res.json();

        bus.$emit("updateNote", { id: this.id, text: data.text });

        bus.$emit("closeModal");
      } catch (error) {
        console.log(error);
      }
    },

    async decryptNote() {
      try {
        const res = await fetch(`http://localhost:5000/${this.id}/decrypt`);
        const data = await res.json();

        this.decryptedNote = data.text;
        this.note = data.text;
      } catch (error) {
        console.log(error);
      }
    },

    editHandler() {
      this.toggleVisibility("show");
      this.mode = "edit";
    },

    async deleteNote() {
      try {
        await fetch(`http://localhost:5000/${this.id}`, {
          method: "DELETE",
        });

        bus.$emit("deleteNote", this.id);
        bus.$emit("closeModal");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.addTodoContainer {
  width: 90%;
  max-width: 500px;
  min-height: 60vh;
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 22px;
  grid-gap: 8px;
}
.options {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  display: grid;
  grid-template-columns: 44px 44px;
  border-radius: 5px;
  background: #000;
}

.options > * {
  border-left: 1px solid #ffffff;
}

.options > :first-child {
  border-left: none;
}

.deleteBtn,
.eye {
  padding: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.addTodoContainer > form {
  display: grid;
  grid-template-rows: auto 60px;
}

.addTodoContainer textarea {
  width: 100%;
  min-height: 200px;
  padding: 50px 15px 15px;
  font-size: 18px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
  border: none;
  outline: none;
  height: 100%;
}
.addTodoContainer > form .todoOptions {
  display: grid;
  grid-template-columns: 1fr 70px;
}

.addTodoContainer > form .todoOptions > div {
  width: 100%;
  padding: 0px 16px;
  background: #ffffff;
}

.addTodoContainer > form .todoOptions select,
.addTodoContainer > form .todoOptions button,
.addTodoContainer > form .todoOptions p {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
}

.addTodoContainer > form .todoOptions button,
.addTodoContainer > form .todoOptions p {
  background: #6b956b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.addTodoContainer > form .todoOptions button img,
.addTodoContainer > form .todoOptions p img {
  width: 22px;
}

.error {
  color: red;
  text-align: left;
  padding: 0 5px;
}

@media (min-width: 500px) {
  .addTodoContainer > form .todoOptions button img {
    width: 27px;
  }
}
</style>
