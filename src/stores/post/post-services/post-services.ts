import { makeAutoObservable } from "mobx";
import { MobxUpdateInstance, useMobxUpdate } from 'mobx-toolbox';
import { GetPostsResponse, PostPropsWithId } from '../../../api/posts/postsApi';

class PostServices {
	constructor() { makeAutoObservable(this); }

	// PRE DATAS

	preLikePost = (postId: string) => {
		if (!this.postUpdater) return;

		this.postUpdater(postId, "liked", (prev) => {
			if (prev) {
				this.postUpdater!(postId, "likeCount", (prev) => prev - 1, "_id");
				return false;
			}

			this.postUpdater!(postId, "likeCount", (prev) => prev + 1, "_id");
			return true;
		}, "_id");
	};

	// UPDATERS

	postUpdater: MobxUpdateInstance<PostPropsWithId> | null = null;
	setPostUpdater = (updater: MobxUpdateInstance<PostPropsWithId>) => this.postUpdater = updater;

	// GET POSTS HANDLERS

	getPostsSuccessHandler = (data: GetPostsResponse[]) => {
		// @ts-ignore
		this.setPostUpdater(useMobxUpdate(() => data));
	};

	getPostsErrorHandler = (error: any) => {
		console.log(error);
	};

	// LIKE POST HANDLERS

	likePostSuccessHandler = (data: any) => {
		console.log(data);
	};

	likePostErrorHandler = (error: any) => {
		console.log(error);
	};
}

export const postServices = new PostServices();