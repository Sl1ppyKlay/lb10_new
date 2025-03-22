<script setup>
defineProps({
  mainText: String,
})
</script>

<template>
  <div class="main-page">
    <div class="main-page__left">
      <p class="mainStyleText">{{ mainText }}</p>
    </div>
    <div class="main-page__right">
      <img src="~/public/images/head.png" alt="голова">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/style.scss' as global;

.main-page {
  display: flex;
  justify-content: space-between;
  &__left {
    position: relative;
    border-radius: 20px;
    background: global.$blockColor;
    width: 100%;
    max-width: 885px;
    height: 104px;
    p {
      line-height: 30px;
      font-size: 25px;
      padding: 22px 45.5px;
    }
  }
  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
    background: global.$blockColor;
    border-radius: 15px;
    width: 435px;
    height: 435px;
    border: global.$mainColor solid 4px;
    img {
      animation: levitation 7s infinite ease-in-out;
    }
  }
}

@keyframes levitation {
  0%, 100% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-15%);
  }
}
</style>
