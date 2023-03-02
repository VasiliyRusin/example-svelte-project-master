<script>
	// setup localization
	import './utils/i18n';

	import { _ } from 'svelte-i18n';
	import JSConfetti from 'js-confetti';
	import { onMount } from 'svelte';

	// style modules are imported as object
	import style from './index.pcss';
	import Logo from './assets/images/logo.png';
	import { count } from './store';
	import Button from './components/button/index.svelte';

	let jsConfetti;

	$: buttonClass = !$count ? style.bgRed : style.bgBlue;

	// use onMount() to manipulate DOM after content has been loaded
	onMount(() => {
	  jsConfetti = new JSConfetti();
	});

	function onClick() {
	  count.set($count + 1);
	  jsConfetti.addConfetti({
	    emojis: ['💥'],
	    confettiNumber: 10,
	  });
	}
</script>

<div class="{style.container}">
	<a class="{style.tutorialLink}" href="https://svelte.dev/tutorial">Svelte tutorial</a>
	<img  class={style.logo} src="{Logo}" alt="logo"/>
	<h1 class="{style.title}">
		{#if !$count}
			<span class="{style.textRed}">
				{$_('emergency')}
			</span>
		{:else}
			{$_('button_pushed')} <span class="{style.textRed}">{$count}</span> {$_('times')}
		{/if}
	</h1>
	<Button wrapperClass="{buttonClass}" text="{$_('push_button')}" on:click={onClick}/>
</div>
