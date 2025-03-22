<template>
  <div class="container">
    <div class="menu">
      <div class="menu__left">
        <NuxtLink class="menuText">Главная</NuxtLink>
      </div>
      <div class="menu__right">
        <div class="menu__right-block">
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.4984 13.2275V23.7725C32.4984 25.4992 31.5734 27.1026 30.0779 27.9813L20.9204 33.2692C19.425 34.1325 17.575 34.1325 16.0642 33.2692L6.90668 27.9813C5.41127 27.118 4.48627 25.5146 4.48627 23.7725V13.2275C4.48627 11.5009 5.41127 9.89748 6.90668 9.01873L16.0642 3.73083C17.5596 2.86749 19.4096 2.86749 20.9204 3.73083L30.0779 9.01873C31.5734 9.89748 32.4984 11.4855 32.4984 13.2275Z" stroke="#DBDBDB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 16.9583C20.4838 16.9583 22.0921 15.3501 22.0921 13.3662C22.0921 11.3824 20.4838 9.7742 18.5 9.7742C16.5161 9.7742 14.9079 11.3824 14.9079 13.3662C14.9079 15.3501 16.5161 16.9583 18.5 16.9583Z" stroke="#DBDBDB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24.6666 25.6841C24.6666 22.9091 21.9071 20.6584 18.5 20.6584C15.0929 20.6584 12.3333 22.9091 12.3333 25.6841" stroke="#DBDBDB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <NuxtLink class="menuText">Авторизация</NuxtLink>
        </div>
      </div>
    </div>
<!---->
    <slot/>
  </div>
</template>
