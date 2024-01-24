USE master;

IF NOT EXISTS (
    SELECT name
    FROM sys.databases
    WHERE
        name = 'blog'
) BEGIN
CREATE DATABASE blog;

END