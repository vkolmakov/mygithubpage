<template>
    <div class="loading-spinner"></div>
</template>

<style lang="scss">
@import "../constants.scss";

.loading-spinner {
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    $size: 24px;
    $spin-duration: 0.5s;

    border-radius: 50%;
    width: $size;
    height: $size;

    border: 0.25rem solid rgba(162, 212, 241, 0.5);
    border-top-color: #a2d4f1;

    animation: spin $spin-duration infinite;
}
</style>
