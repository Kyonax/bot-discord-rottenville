CREATE DATABASE db_discord;

CREATE TABLE Guild
(
    guildID VARCHAR(100) NOT NULL PRIMARY KEY,
    guildOwnerID VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable
(
    guildID VARCHAR(100) NOT NULL PRIMARY KEY,
    guildLanguage VARCHAR(10) DEFAULT 'es',
    cmdPrefix VARCHAR(10) DEFAULT 's!'
);

CREATE TABLE "vehicles" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	"owner"	TEXT NOT NULL,
	"engine"	INTEGER NOT NULL,
	"model"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"health"	INTEGER NOT NULL,
	"x"	REAL NOT NULL,
	"y"	REAL NOT NULL,
	"z"	REAL NOT NULL,
	"r"	INTEGER NOT NULL,
	"g"	INTEGER NOT NULL,
	"b"	INTEGER NOT NULL,
	"rx"	INTEGER NOT NULL,
	"ry"	REAL NOT NULL,
	"rz"	REAL NOT NULL,
	"hood"	INTEGER NOT NULL,
	"trunk"	INTEGER NOT NULL,
	"frontL"	INTEGER NOT NULL,
	"frontR"	INTEGER NOT NULL,
	"rearL"	INTEGER NOT NULL,
	"rearR"	INTEGER NOT NULL,
	"lightFL"	INTEGER NOT NULL,
	"lightFR"	INTEGER NOT NULL,
	"lightRL"	INTEGER NOT NULL,
	"lightRR"	INTEGER NOT NULL,
	"frontLP"	INTEGER NOT NULL,
	"frontRP"	INTEGER NOT NULL,
	"rearLP"	INTEGER NOT NULL,
	"rearRP"	INTEGER NOT NULL,
	"windScrean"	INTEGER NOT NULL,
	"frontB"	INTEGER NOT NULL,
	"rearB"	INTEGER NOT NULL
);


CREATE TABLE Vehicles(
    id INT NOT NULL AUTO_INCREMENT,
    owner VARCHAR(100) NOT NULL,
    serialKey VARCHAR(100),
    engine INT NOT NULL,
    model INT NOT NULL,
    name VARCHAR(100) NOT NULL,    
    health INT NOT NULL,
    x DOUBLE NOT NULL,
    y DOUBLE NOT NULL,
    z DOUBLE NOT NULL,
    r INT NOT NULL,
    g INT NOT NULL,
    b INT NOT NULL,
    rx DOUBLE NOT NULL,
    ry DOUBLE NOT NULL,
    rz DOUBLE NOT NULL,
    hood INT NOT NULL,
    trunk INT NOT NULL,
    frontL INT NOT NULL,
    frontR INT NOT NULL,
    rearL INT NOT NULL,
    rearR INT NOT NULL,
    lightFL INT NOT NULL,
    lightFR INT NOT NULL,
    lightRL INT NOT NULL,
    lightRR INT NOT NULL,
    frontLP INT NOT NULL,
    frontRP INT NOT NULL,
    rearLP INT NOT NULL,
    rearRP INT NOT NULL,
    windScrean INT NOT NULL,
    frontB INT NOT NULL,
    rearB INT NOT NULL,
    wheelFL INT NOT NULL,
    wheelRL INT NOT NULL,
    wheelFR INT NOT NULL,
    wheelRR INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Players(
    account VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,    
    discordID VARCHAR(100) NOT NULL,
    adminMember BOOLEAN NOT NULL DEFAULT false,
    inmortalMember BOOLEAN NOT NULL DEFAULT false,
    moderatorMember BOOLEAN NOT NULL DEFAULT false,
    vipMember BOOLEAN NOT NULL DEFAULT false,
    subMember BOOLEAN NOT NULL DEFAULT false,
    characters INT NOT NULL DEFAULT 0,
    PRIMARY KEY(account,discordID)
);

CREATE TABLE TownVehicles(
    owner VARCHAR(100) NOT NULL,    
    PRIMARY KEY(owner)
);

CREATE TABLE Objects(
    id INT NOT NULL AUTO_INCREMENT,
    owner VARCHAR(100) NOT NULL,
    model INT NOT NULL,
    x DOUBLE NOT NULL,
    y DOUBLE NOT NULL,
    z DOUBLE NOT NULL,
    rx DOUBLE NOT NULL,
    ry DOUBLE NOT NULL,
    rz DOUBLE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE GuildMembers
(
    guildID VARCHAR(100) NOT NULL,
    memberID VARCHAR(100) NOT NULL,
    memberLanguage VARCHAR(6) NOT NULL DEFAULT 'es',
    adminMember BOOLEAN NOT NULL DEFAULT false,
    inmortalMember BOOLEAN NOT NULL DEFAULT false,
    moderatorMember BOOLEAN NOT NULL DEFAULT false,
    serverRank CHAR(100) NOT NULL DEFAULT 0,
    memberXP VARCHAR(100) NOT NULL DEFAULT 0,
    memberLevel CHAR(100) NOT NULL DEFAULT 1,
    memberBoost CHAR(30) NOT NULL DEFAULT 1,
    boostMemberTime CHAR (30) NOT NULL DEFAULT 0,
    warnings CHAR(10) NOT NULL DEFAULT 0,
    PRIMARY KEY (guildID,memberID)
);

INSERT INTO GuildMembers
VALUES('623715606184722442', '248204538941538308', 'es', true, true, true, 1, 2894022, 46, 100, 7909, 0);
INSERT INTO GuildMembers
VALUES('623715606184722442', '250353644820627456', 'es', true, true, true, 5, 407149, 31, 100, 772, 0);
INSERT INTO GuildMembers
VALUES('623715606184722442', '241700516071997440', 'es', true, true, true, 3, 603918, 31, 100, 631, 0);
INSERT INTO GuildMembers
VALUES('623715606184722442', '249052876305989633', 'es', true, true, true, 2, 1494409, 41, 100, 7794, 0);
INSERT INTO GuildMembers
VALUES('623715606184722442', '471451319605919744', 'es', true, true, true, 4, 442995, 31, 50, 658, 0);

CREATE TABLE RolePlayMembers
(
    guildID VARCHAR (100) NOT NULL,
    memberID VARCHAR (100) NOT NULL,
    gameRolePLay VARCHAR(100),
    rolePlayRank CHAR(100) NOT NULL DEFAULT 0,
    memberXP VARCHAR(100) NOT NULL DEFAULT 0,
    memberLevel VARCHAR(100) NOT NULL DEFAULT 1,
    memberAge CHAR(6) NOT NULL DEFAULT 18,
    memberRespect VARCHAR(100) NOT NULL DEFAULT 0,
    memberWork VARCHAR(50) NOT NULL DEFAULT '**Vago**',
    memberRelation VARCHAR(100) NOT NULL DEFAULT 'Soltero/a',
    memberBiography VARCHAR(300) NOT NULL DEFAULT 'None Biography information',
    PRIMARY KEY(guildID,memberID)
);

CREATE TABLE GuildBank
(
    guildID VARCHAR(100) NOT NULL,
    memberID VARCHAR(100) NOT NULL,
    memberCoins VARCHAR(300) NOT NULL,
    PRIMARY KEY (guildID,memberID)
);

INSERT INTO GuildBank
VALUES('623715606184722442', '248204538941538308', 1021008);
INSERT INTO GuildBank
VALUES('623715606184722442', '250353644820627456', 135828);
INSERT INTO GuildBank
VALUES('623715606184722442', '241700516071997440', 110902);
INSERT INTO GuildBank
VALUES('623715606184722442', '249052876305989633', 950351);
INSERT INTO GuildBank
VALUES('623715606184722442', '471451319605919744', 110839);

CREATE TABLE GuildBans
(
    guildID VARCHAR(100) NOT NULL PRIMARY KEY,
    memberID VARCHAR(100) NOT NULL,
    memberTag VARCHAR(100) NOT NULL,    
    memberJoinedAt VARCHAR(100) NOT NULL,
    autorBan VARCHAR(100) NOT NULL
);
