<script>
    import { createEventDispatcher } from 'svelte';
    // use classnames package for dynamic classes or concatenation of multiple modules:
    // https://www.npmjs.com/package/classnames
    import classnames from 'classnames';

    import style from './index.pcss';

    export let text;
    export let wrapperClass = '';

    const dispatch = createEventDispatcher();

    function onClick() {
      dispatch('click');
    }
</script>

<button class="{classnames(style.button, wrapperClass)}" on:click={onClick}>
    {text}
</button>

