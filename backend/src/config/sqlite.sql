CREATE TABLE
    "sshconf" (
        "id" INTEGER NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "path" TEXT NOT NULL UNIQUE,
        "conf" TEXT,
        "create_at" INTEGER,
        "login_at" INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT)
    );

CREATE TABLE
    "sshlog" (
        "id" INTEGER NOT NULL UNIQUE,
        "hostid" INTEGER NOT NULL,
        "path" TEXT NOT NULL,
        "tags" TEXT,
        "content" TEXT,
        "create_at" INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    );

CREATE TABLE
    "sshrule" (
        "id" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "path" TEXT NOT NULL UNIQUE,
        "serial" INTEGER,
        "cmd" TEXT,
        "rule" TEXT,
        "create_at" INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT)
    );

INSERT INTO
    `sshconf` (
        `name`,
        `path`,
        `conf`,
        `create_at`
    )
VALUES (
        "test",
        "/bucket/group/host1",
        '[{"host": "127.0.0.1",
"port": 22,
"username": "root",
"password": "password"},
{"host": "192.168.1.1",
"port": 22,
"username": "root",
"privateKey": "RsaKey"}]',
        "1657809849187"
    );

INSERT INTO
    `sshrule` (
        `name`,
        `path`,
        `serial`,
        `cmd`,
        `rule`,
        `create_at`
    )
VALUES (
        "test",
        "/bucket/group/cmd1",
        1,
        "hostname",
        '[{"match":"test1","call":"@#$print lsblk"}]',
        "1657809849187"
    );