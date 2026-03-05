(require :asdf)
(asdf:load-system :cl-dbi)
(defvar *connection*
  (dbi:connect :sqlite3
               :database-name "/home/dan/tmp/test.sqlite3"))

(dbi:with-connection (conn :sqlite3 :database-name "/home/dan/tmp/test.sqlite3")
  (let* ((query (dbi:prepare conn "SELECT * FROM People"))
         (query (dbi:execute query)))
    (loop for row = (dbi:fetch query)
          while row
          do (format t "~A~%" row))))
