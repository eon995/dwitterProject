let tweets = [
    {
        id: 'abc123',
        text: '언재 파일',
        createdAt: Date.now().toString(),
        name: 'eon',
        username: 'Eon'
    },
    {
        id: 'abc456',
        text: '언재2 파일',
        createdAt: Date.now().toString(),
        name: 'bob',
        username: 'Bob'
    }
];

export function getAll() {
    return tweets;
}

export function getAllByUsername(username) {
    return tweets.filter((t) => t.username == username) || null;
}

export function getById(id) {
    return tweets.find((t) => t.id == id) || null;
}

export function create(text, name, username, userId) {
    console.log("유저" + userId);
    const tweet = {
        id: userId,
        text,
        createdAt: new Date(),
        username,
        name
    };
    tweets = [tweet, ...tweets];
    return tweets;
}

export function update(id, text) {
    const tweet = tweets.find((t) => t.id == id);
    if (tweet) {
        tweet.text = text;
    }
    return tweet;
}

export function remove(id) {
    const tweet = tweets.find((t) => t.id != id);
    return tweet;
}

