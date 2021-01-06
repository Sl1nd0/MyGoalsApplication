
SELECT *
FROM personalgoals

UPDATE personalgoals SET butmet = 'm10' , butremove = 'r10'  WHERE goalsid = 10;

SELECT * FROM personalgoals WHERE goaldesc like '%I Have to do so!%'

ALTER TABLE personalgoals ALTER COLUMN butremove DROP NOT NULL;

DELETE FROM personalgoals WHERE goalsid = 8