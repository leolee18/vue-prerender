<template>
  <div class="about">
    <h1>This is an about page</h1>
		<h2>{{mName1}}{{mName2}}{{mName3}}</h2>
  </div>
</template>

<script>
export default {
  name: 'home',
	data(){
		return {
			mName1:'leolee',
			mName2:'leo2',
			mName3:'leo3'
		}
	},
	mounted() {
		console.log('aaa')
		setTimeout(()=>{
			this.mName2 = 'mName2 leo';
		},3000)
		
		setTimeout(()=>{
			this.mName3 = 'mName3 leo';
		},15000)
	}
}
</script>