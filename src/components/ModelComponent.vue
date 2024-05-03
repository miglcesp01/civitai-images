<template>
    <div
        class="bg-gray-800 w-full h-full mb-3 p-0 aspect-w-4 aspect-h-5 rounded-lg shadow-lg relative overflow-hidden border border-yellow-300 border-opacity-50">
        <div class="inset-0 z-0">
            <v-lazy-image class="w-full h-full object-cover rounded-lg transition duration-300 transform hover:cursor-pointer"
                :src="item.url" :class="{ 'aspect-ratio-5/8': !imageLoaded }" 
                :src-placeholder="'https://via.placeholder.com/150'"
                @error="() => item.url = 'https://via.placeholder.com/150'"
                @load="imageLoaded = true"></v-lazy-image>
        </div>
        <div class="z-10 flex flex-col justify-between h-full w-full">
            <div class="absolute top-2 left-1 right-2 w-full flex justify-end items-center mb-4">
                <button type="button" class="text-gray-400 mr-4 cursor-pointer" @click.stop="toggleTooltip"
                    id="menu-button" aria-expanded="true" aria-haspopup="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="tabler-icon tabler-icon-dots-vertical"
                        style="filter: drop-shadow(rgb(0, 0, 0) 0px 0px 2px);">
                        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                        <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                        <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    </svg>

                </button>
                <div :id="`tooltip-${item.id}`"
                    class="absolute dropdown dropdown-left top-10 right-2 z-11 bg-gray-800 text-white rounded-lg shadow-lg"
                    :class="{ 'hidden': !showTooltip }">
                    <ul class="text-sm">
                        <li class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center hover:rounded-lg m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" class="tabler-icon tabler-icon-bookmark mr-2">
                                <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"></path>
                            </svg>
                            Save image to collection
                        </li>
                        <li
                            class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex space-x-2 items-center hover:rounded-lg m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" class="tabler-icon tabler-icon-eye-off mr-2">
                                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
                                <path
                                    d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87">
                                </path>
                                <path d="M3 3l18 18"></path>
                            </svg>
                            View Post
                        </li>
                        <li
                            class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex space-x-2 items-center hover:rounded-lg m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" class="tabler-icon tabler-icon-user-off mr-2">
                                <path d="M8.18 8.189a4.01 4.01 0 0 0 2.616 2.627m3.507 -.545a4 4 0 1 0 -5.59 -5.552">
                                </path>
                                <path
                                    d="M6 21v-2a4 4 0 0 1 4 -4h4c.412 0 .81 .062 1.183 .178m2.633 2.618c.12 .38 .184 .785 .184 1.204v2">
                                </path>
                                <path d="M3 3l18 18"></path>
                            </svg>
                            Hide content from this user
                        </li>
                        <li
                            class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex space-x-2 items-center hover:rounded-lg m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" class="tabler-icon tabler-icon-flag mr-2">
                                <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z">
                                </path>
                                <path d="M5 21v-7"></path>
                            </svg>
                            Report image
                        </li>
                    </ul>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 right-0 text-white ml-1 mr-4">
                <div class="flex justify-between text-gray-400 text-sm bg-black bg-opacity-50 p-2 rounded-xl">
                    <div class="flex items-center text-white text-sm">
                        👍
                        {{ item.stats.likeCount }}
                    </div>
                    <div class="flex items-center text-white text-sm">
                        ❤️
                        {{ item.stats.heartCount }}
                    </div>
                    <div class="flex items-center text-white text-sm">
                        😂
                        {{ item.stats.laughCount }}
                    </div>
                    <div class="flex items-center text-white text-sm">
                        😢
                        {{ item.stats.cryCount }}
                    </div>
                    <div
                        class="flex items-center text-orange-500 text-white text-sm bg-orange-500 bg-opacity-50 p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="yellow.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="tabler-icon tabler-icon-bolt text-orange-500" style="fill: rgb(245, 159, 0);">
                            <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
                        </svg>
                        {{ item.stats.commentCount }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VLazyImage from "v-lazy-image";

export default {
    components: {
        VLazyImage
    },
    props: {
        item: Object
    },
    data() {
        return {
            showTooltip: false,
            imageLoaded: false
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        toggleTooltip() {
            this.showTooltip = !this.showTooltip;
        },

        checkUrlType(url) {
            const extension = url.split('.').pop();

            const mimeType = mime.lookup(extension);

            if (mimeType && (mimeType.startsWith('image/') || mimeType.startsWith('video/'))) {
                if (mimeType.startsWith('image/')) {
                    return 'image';
                } else if (mimeType.startsWith('video/')) {
                    return 'video';
                }
            }

            return 'image';
        },

        handleOutsideClick(event) {
            try {
                const moreOptions = document.getElementById(`tooltip-${this.item.id}`);

                if (!moreOptions.value && !moreOptions.contains(event.target)) {
                    this.showTooltip = false;
                }
            } catch (err) {
                this.showTooltip = true;
            }
        },
        handleImageError(event) {
            event.target.src = 'https://via.placeholder.com/150';
        }
    }
}
</script>

<style scoped></style>