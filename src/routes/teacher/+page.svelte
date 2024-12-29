<script lang="ts">
	import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import whitelist from '../../config/teacher_email.json';
	import { auth } from '$lib/firebase';
	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			// TODO: https://github.com/jamezmca/sveltekit-auth/blob/main/src/routes/privatedashboard/%2Bpage.svelte
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			let verified = false;
			for (const email of whitelist.data) {
				if (email == user.email) {
					verified = true;
				}
			}
			// console.log(verified);
			// console.log(token);
		})
		.catch((error) => {
			console.log(error);
		});
</script>


TEACHER PAGE
