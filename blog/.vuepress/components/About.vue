<!--  -->
<template>
  <div class="about">
    <Content />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="stylus" scoped>
.about {
  min-height: 100%
  background: url('/bg.png') no-repeat right bottom
  background-size: 180px

  @media (max-width: $MQMobile) {
    background-size: 100px
  }
}
</style>
