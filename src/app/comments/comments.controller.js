angular
  .module('clientTodo')
  .controller('CommentsController', CommentsController);

  function CommentsController($scope, Comment, $mdDialog, passedTask, Upload) {
    var vm = this;

    var task = passedTask
    var commentsCount = passedTask.commentsCount

    vm.progressBar = {
      show: true
    };

    vm.cancel = cancel;
    vm.getComments = getComments;
    vm.queryComment = queryComment;
    vm.removeComment = removeComment;
    vm.createComment = createComment;
    vm.resetForm = resetForm;
    vm.attachFile = attachFile;

    function cancel() {
      $mdDialog.cancel(commentsCount);
    }

    function createComment(form) {
      console.log('tried to upload file');      
      base64File = ''
      Upload.dataUrl(form.attachment, true).then(function(url)
        {
          // console.log('this is url ' + url);          
          var comment = new Comment({
            listId: task.listId,
            taskId: task.id,
            body: form.body,
            attachment: url
          });          
          comment.create();
        })
      // form.attachment.upload = Upload.upload({        
      //   url: '/api/lists/' + task.listId + '/tasks/' + task.id + '/comments',
      //   data: { 
      //     comment: {
      //       attachment: form.attachment 
      //     }
      //   }
      // });

      // console.log('usual flow for creating comment');
      // var comment = new Comment({
      //   listId: task.listId,
      //   taskId: task.id,
      //   body: form.body        
      // });
      // comment.create().then(function(createdComment) {
      //   resetForm(form)
      //   commentsCount++
      //   $scope.comments.push(createdComment);
      // });
    }

    function attachFile(form) {
      console.log('attachFile function in development');
      console.log(form.attachment);

    }

    function resetForm(form) {
      console.log('in resetForm comment');
      form.$setUntouched();
      form.$setPristine();
      form.body = ''
    }

    function getComments(passedTask) {
      console.log("wait...wait...wait for getComments from task " + task.id);
      queryComment(task);
    }

    function removeComment(comment) {
      console.log('in removeComment function');
      var index = $scope.comments.indexOf(comment);
      if (index > -1) {
        $scope.comments.splice(index, 1);
      }
      commentsCount--
      comment.listId = task.listId
      comment.remove()
    }

    function queryComment(task) {
      console.log('! in queryComment');
      $scope.comments = []
      var comments = Comment.get({
        listId: task.listId,
        taskId: task.id
      }).then(function (comments) {
        $scope.comments = comments;
        vm.progressBar.show = false;
      });
    }

    getComments();

  }
