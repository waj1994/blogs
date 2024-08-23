<script setup lang="ts"></script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
      <div class="lg:col-span-2 shrink-0">
        <LeftMenu />
      </div>
      <div class="lg:col-span-8">
        <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
          <div class="markdown-body lg:col-span-8 mt-8 pb-24 max-w-none">
            <ContentDoc />
          </div>
          <div class="lg:col-span-2">
            <div
              class="order-first lg:order-last sticky top-[var(--header-height)] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] z-10"
            >
              <Toc />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
