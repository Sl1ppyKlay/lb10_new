<script setup>
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
}

</script>

<template>
  <div class="modal-window">
    <div class="modal-window__block">
      <div class="modal-window__close" @click="close">
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.58301 1.28943L12.9777 12.6842" stroke="#323238" stroke-width="2" stroke-linecap="round"/>
          <path d="M13.8 1.28943L2.40526 12.6842" stroke="#323238" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h1>АВТОРИЗАЦИЯ</h1>
      <form>
        <input type="text" placeholder="ЛОГИН">
        <input type="password" placeholder="ПАРОЛЬ">
        <div class="buttons-container">
          <button @click.prevent>ВОЙТИ</button>
          <button @click.prevent>РЕГИСТРАЦИЯ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/style.scss' as global;

.modal-window {
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999;
  &__close {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    margin: 9px 9px 0 0;
    padding: 7px;
    &:hover {
      svg path {
        stroke: global.$textColor;
      }
    }
  }
  &__block {
    position: relative;
    top: 32%;
    left: 50%;
    transform: translate(-50%, -32%);
    width: 399px;
    height: 287px;
    background: global.$blockColor;
    border-radius: 15px;
    border: 1px solid global.$strokeAndForm;
    padding: 24px 40px 23px 40px;
    h1 {
      //margin: 24px 0 17px 0;
      margin: 0px 0 17px 0;
      font-family: 'Noir Pro', sans-serif;
      color: global.$textColor;
      font-size: 30px;
      padding-left: 8px;
    }
    form {
      input {
        outline: none;
        font-family: global.$NP;
        font-size: 22px;
        color: global.$textColor;
        width: 100%;
        height: 52px;
        margin-bottom: 14px;
        border: none;
        background: global.$strokeAndForm;
        padding: 12px 0 12px 17px;
        border-radius: 10px;
        &:last-child {
          margin-bottom: 20px;
        }
        &::placeholder {
          color: global.$textColor;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        &:focus::placeholder {
          opacity: 0;
        }
      }
      button {
        justify-content: center;
        align-items: center;
        border: none;
        font-family: global.$NP;
        font-size: 22px;
        color: global.$textColor;
        height: 52px;
        background: global.$strokeAndForm;
        border-radius: 10px;
        padding: 0;
        transition: .25s ease;
        cursor: pointer;
        &:hover {
          color: global.$blockColor;
          background: global.$textColor;
        }
      }
      .buttons-container {
        display: grid;
        grid-template-columns: repeat(2, auto);
        gap: 16px;
      }
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>