import { readPosts } from '~/sagas/postsSaga'; 


export default function* rootSaga() {
	yield [
		readPosts()
	];
}