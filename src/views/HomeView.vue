<template>
  <main>

    <div class="container">
      <div class="flex justify-center text-white mb-5">
        <p>Made with ❤️ by miglcesp01</p>
      </div>
      <div id="image-list" class="columns-2 md:columns-3 lg:columns-4" style="overflow-y: auto;">
        <ModelComponent v-for="item in items" :key="item.id" :item="item" />
      </div>
      <div v-if="isLoading" class="flex justify-center text-white my-5">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>
    </div>
  </main>
</template>

<script>
import TheWelcome from '../components/TheWelcome.vue'
import ModelComponent from '../components/ModelComponent.vue'

export default {
  components: {
    TheWelcome,
    ModelComponent
  },
  data() {
    return {
      isLoading: false,
      items: [],
      nextPage: 'https://civitai.com/api/v1/images'
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.loadImages()
  },
  methods: {
    debounce(func, wait, immediate) {
      let timeout;
      return function () {
        const context = this;
        const args = arguments;
        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    handleScroll() {
      if (!this.isLoading) {
        let scrollHeight = window.scrollY
        let maxHeight = window.document.body.scrollHeight - window.document.documentElement.clientHeight

        if (scrollHeight >= maxHeight - 200) {
          this.loadImages()
        }
      }
    },
    loadImages() {
      this.isLoading = true
      setTimeout(() => {
        fetch(this.nextPage)
        .then(response => response.json())
        .then(data => {
          this.items = [...this.items, ...data.items];
          this.nextPage = data.metadata.nextPage;
          console.log(this.nextPage);
          this.isLoading = false
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000);
        })
      }, 2000);
    }
  }
}
</script>

<style scoped></style>
