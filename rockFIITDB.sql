/* Louis Doherty created all tables and added most exercises*/

BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "exerciseLog" (
	"userID"	INTEGER NOT NULL UNIQUE,
	"exerciseID"	INTEGER NOT NULL UNIQUE,
	"categoryNames"	TEXT,
	"exerciseNames"	TEXT UNIQUE,
	"setsCompleted"	INTEGER,
	"repsCompleted"	INTEGER,
	"time"	INTEGER,
	"weightUsed"	REAL,
	PRIMARY KEY("userID"),
	FOREIGN KEY("exerciseID") REFERENCES "exerciseLibrary"("exerciseID"),
	FOREIGN KEY("exerciseNames") REFERENCES "exerciseLibrary"("Exercises"),
	FOREIGN KEY("categoryNames") REFERENCES "exerciseLibrary"("Category"),
	FOREIGN KEY("userID") REFERENCES "userTable"("userID")
);
CREATE TABLE IF NOT EXISTS "exerciseLibrary" (
	"exerciseID"	INTEGER NOT NULL UNIQUE,
	"Category"	TEXT,
	"Exercises"	TEXT,
	"Description"	TEXT,
	"Sets"	INTEGER,
	"Reps"	INTEGER,
	"Time"	INTEGER,
	"Link"	TEXT,
	"Sort"	INTEGER UNIQUE,
	"Weight?"	INTEGER,
	PRIMARY KEY("exerciseID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "userTable" (
	"userID"	INTEGER NOT NULL UNIQUE,
	"userName"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"unitPrefernce"	INTEGER,
	"weight"	REAL,
	PRIMARY KEY("userID" AUTOINCREMENT)
);
INSERT INTO "exerciseLibrary" VALUES (0,'Legs','Back Squats',NULL,3,10,NULL,NULL,1,NULL);
INSERT INTO "exerciseLibrary" VALUES (1,'Legs','Deadlift',NULL,5,5,NULL,NULL,2,NULL);
INSERT INTO "exerciseLibrary" VALUES (2,'Legs','Goblet Squats',NULL,4,8,NULL,NULL,3,NULL);
INSERT INTO "exerciseLibrary" VALUES (3,'Legs','KB Swing',NULL,3,20,NULL,NULL,4,NULL);
INSERT INTO "exerciseLibrary" VALUES (4,'Legs','RDL',NULL,4,8,NULL,NULL,5,NULL);
INSERT INTO "exerciseLibrary" VALUES (5,'Legs','Lunges',NULL,3,20,NULL,NULL,6,NULL);
INSERT INTO "exerciseLibrary" VALUES (6,'Push','Bench Press',NULL,5,5,NULL,NULL,7,NULL);
INSERT INTO "exerciseLibrary" VALUES (7,'Push','Incline DB Press',NULL,3,12,NULL,NULL,8,NULL);
INSERT INTO "exerciseLibrary" VALUES (8,'Push','Military Press',NULL,3,8,NULL,NULL,9,NULL);
INSERT INTO "exerciseLibrary" VALUES (9,'Push','DB Shoulder Press',NULL,4,12,NULL,NULL,10,NULL);
INSERT INTO "exerciseLibrary" VALUES (10,'Push','Tricep Pushdowns',NULL,3,10,NULL,NULL,11,NULL);
INSERT INTO "exerciseLibrary" VALUES (11,'Push','Tricep Kickbacks',NULL,3,12,NULL,NULL,12,NULL);
INSERT INTO "exerciseLibrary" VALUES (13,'Pull','Hammer Curls',NULL,4,8,NULL,NULL,13,NULL);
INSERT INTO "exerciseLibrary" VALUES (14,'Pull','Bicep Curls',NULL,4,10,NULL,NULL,14,NULL);
INSERT INTO "exerciseLibrary" VALUES (15,'Pull','Barbell Rows',NULL,3,8,NULL,NULL,15,NULL);
INSERT INTO "exerciseLibrary" VALUES (16,'Pull','Lat Pulldowns',NULL,3,10,NULL,NULL,16,NULL);
INSERT INTO "exerciseLibrary" VALUES (17,'Climbing','Pull Ups (weighted)',NULL,5,5,NULL,NULL,17,NULL);
INSERT INTO "exerciseLibrary" VALUES (18,'Climbing','Lock Offs',NULL,3,1,10,NULL,18,NULL);
INSERT INTO "exerciseLibrary" VALUES (19,'Climbing','Max Hangs',NULL,5,1,5,NULL,19,NULL);
INSERT INTO "userTable" VALUES (1,'alice@gmail.com','dogCat','lbs',130.0);
COMMIT;
