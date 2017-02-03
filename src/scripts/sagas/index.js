import posts from '~/sagas/postsSaga';
import user from '~/sagas/userSaga'; 


export default function* rootSaga() {
	yield [
		posts(),
		user()
	];
}