(require :asdf)
(asdf:load-system :cl-async)

(defun my-echo-server ()
  (format t "Starting server.~%")
  (as:tcp-server nil 9003  ; nil is "0.0.0.0"
                 (lambda (socket data)
                   ;; echo the data back into the socket
                   (as:write-socket-data socket data))
                 (lambda (err) (format t "listener event: ~a~%" err)))
  ;; catch sigint
  (as:signal-handler 2 (lambda (sig)
                         (declare (ignore sig))
                         (as:exit-event-loop))))

(as:start-event-loop #'my-echo-server)
