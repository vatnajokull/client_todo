angular
  .module('clientTodo')
  .controller('CommentsController', CommentsController);

  function CommentsController(Comment, $mdDialog, passedTask, Upload) {
    var vm = this;
    vm.comments = []

    var task = passedTask
    var commentsCount = passedTask.commentsCount

    vm.progressBar = {};

    vm.newComment = {};

    vm.cancel = cancel;
    vm.getComments = getComments;
    vm.queryComment = queryComment;
    vm.removeComment = removeComment;
    vm.newCommentResolver = newCommentResolver;
    vm.resetForm = resetForm;

    function cancel() {
      $mdDialog.cancel(commentsCount);
    }

    function createCommentWithAttachment(newComment, form) {
      Upload.base64DataUrl(newComment.attachment).then(function(url){
        createSimpleComment(newComment, url, form)
      });
    }

    function createSimpleComment(newComment, base64url, form) {
      vm.progressBar.upload = true;
      var comment = new Comment({
        listId: task.listId,
        taskId: task.id,
        body: newComment.body,
        attachment: base64url
      });

      comment.create().then(function(createdComment) {
        resetForm(form)
        vm.newComment = null;
        commentsCount++
        vm.comments.push(createdComment);
        vm.progressBar.upload = false;
      });
    }


    function newCommentResolver(newComment, form) {
      if (newComment.attachment) {
        createCommentWithAttachment(newComment, form);
      } else {
        createSimpleComment(newComment, null, form)
      }
    }

    function resetForm(form) {
      form.$setUntouched();
      form.$setPristine();
    }

    function getComments(passedTask) {
      queryComment(task);
    }

    function removeComment(comment) {
      var index = vm.comments.indexOf(comment);
      if (index > -1) {
        vm.comments.splice(index, 1);
      }
      commentsCount--
      comment.listId = task.listId
      comment.remove()
    }

    function queryComment(task) {
      vm.progressBar.load = true;
      vm.comments = []
      var comments = Comment.get({
        listId: task.listId,
        taskId: task.id
      }).then(function (comments) {
        vm.comments = comments;
        vm.progressBar.load = false;
      });
    }

    getComments();

  }
