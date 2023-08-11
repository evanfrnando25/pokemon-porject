<template>
    <div class="card-custom">
        <div v-if="header" class="card-custom__header">
            <slot name="header" />
            <hr />
        </div>
        <div class="card-custom__content">
            <slot name="content" />
        </div>
        <div v-if="footer" class="card-custom__footer">
            <hr />
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        header: {
            type: Boolean,
            required: false,
        },
        footer: {
            type: Boolean,
            required: false
        }
    },
};
</script>

<style lang="scss" scoped>
.card-custom {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: transform 0.3s;
    padding: 20px;

    hr {
        margin: 10px 0px;
    }

    &__header {
        font-weight: bold;
        
    }

}
</style>