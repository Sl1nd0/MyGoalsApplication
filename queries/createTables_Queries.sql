CREATE TABLE accountplanner
(
  userid serial NOT NULL PRIMARY KEY,
  username character varying(255) NOT NULL,
  usersurname character varying(255) NOT NULL,
  userbdate date NOT NULL,
  useremail character varying(255) NOT NULL,
  usernumber integer NOT NULL,
  userpass character varying(255) NOT NULL
)

Drop Table workgoals
CREATE TABLE workgoals
(
  wgoalsid serial NOT NULL,
  wgoal character varying(100) NOT NULL,
  wgoaldesc character varying(500) NOT NULL,
  wgoaldate date NOT NULL,
  wbutremove character varying(50),
  wbutmet character varying(50),
  wgoalstatus character varying(50) NOT NULL,
  userID INTEGER REFERENCES accountplanner(userid)
)


CREATE TABLE personalgoals
(
  goalsid serial NOT NULL,
  goal character varying(255) NOT NULL,
  goaldesc character varying(500) NOT NULL,
  goaldate date NOT NULL,
  butremove character varying(100) DEFAULT NULL::character varying,
  butmet character varying(100) DEFAULT NULL::character varying,
  goalstatus character varying(50),
  userID INTEGER REFERENCES accountplanner(userid)
)




