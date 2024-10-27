import { Authing } from "./app";
import { CommentAuthorNotMatchError, CommentDoc } from "./concepts/commenting";
import { AlreadyFriendsError, FriendNotFoundError, FriendRequestAlreadyExistsError, FriendRequestDoc, FriendRequestNotFoundError } from "./concepts/friending";
import { GroupDoc } from "./concepts/grouping";
import { MapDoc } from "./concepts/mapping";
import { MilestoneDoc } from "./concepts/milestoning";
import { PostAuthorNotMatchError, PostDoc } from "./concepts/posting";
import { Router } from "./framework/router";

/**
 * This class does useful conversions for the frontend.
 * For example, it converts a {@link PostDoc} into a more readable format for the frontend.
 */
export default class Responses {
  /**
   * Convert PostDoc into more readable format for the frontend by converting the author id into a username.
   */
  static async post(post: PostDoc | null) {
    if (!post) {
      return post;
    }
    const author = await Authing.getUserById(post.author);
    return { ...post, author: author.username };
  }

  /**
   * Convert CommentDoc into more readable format for the frontend by converting the author id into a username.
   */
  static async comment(comment: CommentDoc | null) {
    if (!comment) {
      return comment;
    }
    const author = await Authing.getUserById(comment.author);
    return { ...comment, author: author.username };
  }

  /**
   * Convert GroupDoc into more readable format for the frontend.
   */
  static async group(group: GroupDoc | null) {
    if (!group) {
      return group;
    }
    const groupOwner = await Authing.getUserById(group.groupOwner);
    if (!group.resource) {
      const groupMembers = await Authing.idsToUsernames(group.groupMembers);
      return { ...group, groupMembers: groupMembers, groupOwner: groupOwner.username };
    }
    return { ...group, groupOwner: groupOwner.username };
  }

  /**
   * Convert MilestoneDoc into more readable format for the frontend.
   */
  static async milestone(milestone: MilestoneDoc | null) {
    if (!milestone) {
      return milestone;
    }
    return { ...milestone };
  }

  /**
   * Convert MapDoc into more readable format for the frontend.
   */
  static async map(map: MapDoc | null) {
    if (!map) {
      return map;
    }
    const user = await Authing.getUserById(map.user);
    return { ...map, user: user.username };
  }

  /**
   * Same as {@link post} but for an array of PostDoc for improved performance.
   */
  static async posts(posts: PostDoc[]) {
    const authors = await Authing.idsToUsernames(posts.map((post) => post.author));
    return posts.map((post, i) => ({ ...post, author: authors[i] }));
  }

  /**
   * Display information for array of comments.
   */
  static async comments(comments: CommentDoc[]) {
    const authors = await Authing.idsToUsernames(comments.map((comment) => comment.author));
    return comments.map((comment, i) => ({ ...comment, author: authors[i] }));
  }

  /**
   * Display information for array of groups.
   */
  static async groups(groups: GroupDoc[]) {
    const groupOwners = await Authing.idsToUsernames(groups.map((group) => group.groupOwner));
    const groupMembers = await Promise.all(groups.map((group) => (group.resource === false ? Authing.idsToUsernames(group.groupMembers) : group.groupMembers)));
    return groups.map((group, i) => ({ ...group, groupMembers: groupMembers[i], groupOwner: groupOwners[i] }));
  }

  /**
   * Display information for array of milestones.
   */
  static async milestones(milestones: MilestoneDoc[]) {
    return milestones.map((milestone) => ({ ...milestone }));
  }

  /**
   * Display information for array of maps.
   */
  static async maps(maps: MapDoc[]) {
    const users = await Authing.idsToUsernames(maps.map((user) => user.user));
    return maps.map((map, i) => ({ ...map, user: users[i] }));
  }

  /**
   * Convert FriendRequestDoc into more readable format for the frontend
   * by converting the ids into usernames.
   */
  static async friendRequests(requests: FriendRequestDoc[]) {
    const from = requests.map((request) => request.from);
    const to = requests.map((request) => request.to);
    const usernames = await Authing.idsToUsernames(from.concat(to));
    return requests.map((request, i) => ({ ...request, from: usernames[i], to: usernames[i + requests.length] }));
  }
}

Router.registerError(PostAuthorNotMatchError, async (e) => {
  const username = (await Authing.getUserById(e.author)).username;
  return e.formatWith(username, e._id);
});

Router.registerError(CommentAuthorNotMatchError, async (e) => {
  const username = (await Authing.getUserById(e.author)).username;
  return e.formatWith(username, e._id);
});

Router.registerError(FriendRequestAlreadyExistsError, async (e) => {
  const [user1, user2] = await Promise.all([Authing.getUserById(e.from), Authing.getUserById(e.to)]);
  return e.formatWith(user1.username, user2.username);
});

Router.registerError(FriendNotFoundError, async (e) => {
  const [user1, user2] = await Promise.all([Authing.getUserById(e.user1), Authing.getUserById(e.user2)]);
  return e.formatWith(user1.username, user2.username);
});

Router.registerError(FriendRequestNotFoundError, async (e) => {
  const [user1, user2] = await Promise.all([Authing.getUserById(e.from), Authing.getUserById(e.to)]);
  return e.formatWith(user1.username, user2.username);
});

Router.registerError(AlreadyFriendsError, async (e) => {
  const [user1, user2] = await Promise.all([Authing.getUserById(e.user1), Authing.getUserById(e.user2)]);
  return e.formatWith(user1.username, user2.username);
});
