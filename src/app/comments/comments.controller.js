angular
  .module('clientTodo')
  .controller('CommentsController', CommentsController);

  function CommentsController($scope, Comment, $mdDialog, passedTask, Upload, $mdToast) {
    var vm = this;

    var task = passedTask
    var commentsCount = passedTask.commentsCount

    vm.progressBar = {};
      
    vm.cancel = cancel;
    vm.getComments = getComments;
    vm.queryComment = queryComment;
    vm.removeComment = removeComment;
    vm.createComment = createComment;
    vm.resetForm = resetForm;
    vm.attachFile = attachFile;

    function cancel() {
      console.log('in cancel');
      console.log('count: ' + commentsCount);
      $mdDialog.cancel(commentsCount);
    }

    function createComment(form) {      
      console.log('simple create comment');
      var comment = new Comment({
        listId: task.listId,
        taskId: task.id,
        body: form.body        
      });
      
      comment.create().then(function(createdComment) {
        resetForm(form)
        commentsCount++
        $scope.comments.push(createdComment);
      });    
    }

    function showError(errorDescription) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(errorDescription)
          .position('top right' )
          .hideDelay(1500)
      );      
    }

    function attachFile(file, errFiles) {            
      console.log('tried to upload file');            
            
      if (file) {
        uploadImageToServer(file);        
      } else if (errFiles[0] && errFiles[0].$error === 'maxSize') {
        showError("An uploaded file is too large. The size shouldn’t exceed 10 MB.")
      }
     }

    function uploadImageToServer(file) {
      vm.progressBar.upload = true;
      Upload.dataUrl(file, true).then(function(url) {               
          
        var comment = new Comment({
          listId: task.listId,
          taskId: task.id,
          attachment: url
        });          
          
        comment.create().then(function(createdComment) { 
          console.log('image was uploaded');         
          commentsCount++
          $scope.comments.push(createdComment);
          vm.progressBar.upload = false;
        });    
      })       
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
      vm.progressBar.load = true;
      $scope.comments = []
      var comments = Comment.get({
        listId: task.listId,
        taskId: task.id
      }).then(function (comments) {
        $scope.comments = comments;
        vm.progressBar.load = false;
      });
    }

    getComments();

  }
