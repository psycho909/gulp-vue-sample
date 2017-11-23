<template>
    <div class="test">
        <p>{{ message }}</p>
        <Child></Child>
    </div>
</template>
<script>
import Child from './child.vue'
export default {
    components:{
        Child:Child
    },
    data() {
        return {
            message: "Hello World !!!!!!"
        };
    }
};
</script>
<style>
    .test{
        border:1px solid #000;
    }
</style>
