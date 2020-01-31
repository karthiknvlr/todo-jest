module.exports = {
	apps: [
		{
			name: 'Todo',
			script: 'bin/www',
			instances: 1,
			autorestart: true,
			watch: false,
			watch_delay: 10000, // Delay between restart
			ignore_watch: ['node_modules'],
			max_memory_restart: '1G',
			env_local: {
				NODE_ENV: 'development',
				HOST: '127.0.0.1',
				PORT: '3000',
				MONGODB_URI: 'mongodb://localhost:27017',
				DATABASE: 'todo'
			},
			env_test: {
				NODE_ENV: 'test',
				HOST: '127.0.0.1',
				PORT: '3000',
				MONGODB_URI: 'mongodb://localhost:27017',
				DATABASE: 'todo-test'
			}
		}
	]
};
