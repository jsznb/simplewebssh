CREATE TABLE
    `sshconf` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `name` varchar(31) NOT NULL,
        `path` varchar(255) DEFAULT NULL,
        `conf` text,
        `create_at` bigint DEFAULT NULL,
        `login_at` bigint DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `path_UNIQUE` (`path`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `sshrule` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `name` varchar(45) NOT NULL,
        `path` varchar(45) NOT NULL,
        `serial` bigint DEFAULT NULL,
        `cmd` text,
        `rule` text NOT NULL,
        `create_at` bigint DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `path_UNIQUE` (`path`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `sshlog` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `hostid` bigint NOT NULL,
        `path` varchar(255) NOT NULL,
        `tags` varchar(255) DEFAULT NULL,
        `content` text,
        `create_at` bigint NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1014 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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