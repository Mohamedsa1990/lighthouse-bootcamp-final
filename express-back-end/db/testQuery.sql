SELECT jobs.*, starts, ends FROM jobs JOIN 
  (SELECT job_id, starts, ends FROM (SELECT DISTINCT(starts), job_id, ends FROM assignments)AS list1
  UNION
  SELECT DISTINCT(job_id), starts, ends FROM assignments)as bookings
ON jobs.id = job_id
ORDER BY starts

SELECT * FROM requirements JOIN tasks ON task_id = tasks.id