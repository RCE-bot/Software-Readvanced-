import { mysqlTable, serial, int } from 'drizzle-orm/mysql-core';
mysqlTable('user', {
	id: serial('id').primaryKey(),
	age: int('age')
});
