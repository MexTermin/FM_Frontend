<template>
    <div class="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3" role="alert" v-if="type==='success'">
        A simple success alert - check it out!
    </div>
    <div class="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3" role="alert" v-if="type==='danger'">
        A simple danger alert - check it out!
    </div>
    <div class="bg-yellow-100 rounded-lg py-5 px-6 mb-4 text-base text-yellow-700 mb-3" role="alert"  v-if="type==='warning'">
        A simple warning alert - check it out!
    </div>
</template>

<script lang="ts">

export default {
    props: { type: String },
    name: "Alert"
}
</script>

<style>
</style>