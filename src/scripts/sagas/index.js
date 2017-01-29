import posts from '~/sagas/postsSaga'; 


export default function* rootSaga() {
	yield [
		posts()
	];
}