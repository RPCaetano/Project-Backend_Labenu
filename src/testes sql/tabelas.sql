 CREATE TABLE fullstack_users(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            nickname VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
         );

CREATE TABLE fullstack_image(
id VARCHAR  (255)PRIMARY KEY,
subtitle VARCHAR (255) NOT NULL,
author VARCHAR(255) NOT NULL,
date DATE NOT NULL,
tags VARCHAR(255)NOT NULL,
file VARCHAR (255) NOT NULL,
collection VARCHAR(255) NOT NULL
);

DROP TABLE  fullstack_image;
DROP TABLE fullstack_tag;

DROP TABLE fullstack_image_tag;

CREATE TABLE fullstack_tag(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255)NOT NULL);

CREATE TABLE fullstack_image_tag(
image_id VARCHAR(255) NOT NULL,
tag_id INT NOT NULL,
FOREIGN KEY(image_id)REFERENCES fullstack_image(id),
FOREIGN KEY (tag_id)REFERENCES fullstack_tag(id)
);

show tables;

SELECT * FROM fullstack_users;

