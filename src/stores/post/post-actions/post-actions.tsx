import { makeAutoObservable } from 'mobx';
import { MobxSaiInstance, mobxSaiFetch, mobxSaiHandler } from 'mobx-toolbox';
import { GetPostsResponse } from '../../../api/posts/postsApi';
import { baseInstance } from '../../../shared/api';
import { postServices } from '../post-services/post-services';

class PostActions {
	constructor() { makeAutoObservable(this); }

	posts: MobxSaiInstance<GetPostsResponse[]> = {};

	getPostsAction = () => {
		const { getPostsSuccessHandler, getPostsErrorHandler } = postServices;

		this.posts = mobxSaiFetch(
			() => getAllPosts(),
			{ id: "getPostsAction", }
		);

		mobxSaiHandler(
			this.posts,
			getPostsSuccessHandler,
			getPostsErrorHandler
		);
	};

	// LIKE POST ACTION

	likePost: MobxSaiInstance<any> = {};

	likePostAction = (postId: string) => {
		const { likePostSuccessHandler, likePostErrorHandler } = postServices;

		this.likePost = mobxSaiFetch(
			() => likePost(postId),
			{ id: "likePost", fetchIfPending: false, fetchIfHaveData: true, }
		);

		mobxSaiHandler(
			this.likePost,
			likePostSuccessHandler,
			likePostErrorHandler
		);
	};
}

export const postActions = new PostActions();

const getAllPosts = async () => (await baseInstance.get("/posts")).data;
const likePost = async (postId: string) => (await baseInstance.patch(`/posts/liked/${postId}`)).data;