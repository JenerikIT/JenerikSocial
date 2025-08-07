import { makeAutoObservable } from 'mobx';
import { mobxDebouncer } from 'mobx-toolbox';
import { PostProps } from '../../../api/posts/postsApi';
import { postActions } from '../post-actions/post-actions';
import { postServices } from '../post-services/post-services';

class PostInteractions {
	constructor() { makeAutoObservable(this); }

	oldLiked: boolean | null = null;

	likePostHandler = (post: PostProps) => {
		const { likePostAction } = postActions;
		const { preLikePost, postUpdater } = postServices;

		const postId = post._id;

		if (this.oldLiked === null) this.oldLiked = post.liked || false;

		preLikePost(postId);

		mobxDebouncer.debouncedAction("likePostHandler", () => {
			postUpdater!(postId, "liked", (prev) => {
				if (prev === this.oldLiked) return prev;
				likePostAction(postId);
				this.oldLiked = null;
				return prev;
			}, "_id");
		}, 2000);
	};
}

export const postInteractions = new PostInteractions();