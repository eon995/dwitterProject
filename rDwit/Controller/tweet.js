import * as tweetRepository from '../Data/tweet.js';

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = tweetRepository.getAllByUsername(username);
    if (username) {
        res.status(200).json(data);
    } else {
        res.status(200).json(tweetRepository.getAll());
    }

}

export async function getTweet(req, res) {
    const id = req.params.id;
    const tweet = tweetRepository.getById(id);

    console.log(id);
    if (tweet) {
        return res.status(200).json(tweet);
    }
    return res.status(400).json({ message: " id not found" })
}

export async function createTweet(req, res) {
    const userId = req.userId;
    const { text, name, username } = req.body;
    const tweet = tweetRepository.create(text, name, username, userId);
    res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
    const text = req.body.text;
    const id = req.params.id;

    const getId = tweetRepository.getById(id);

    if (!getId) {
        res.status(404).json({ message: "id가 존재하지 않습니다." });
    }
    console.log(getId.id + req.userId);


    if (getId.id !== req.userId) {
        res.status(403).json({ message: "id가 달라 수정권한이 없습니다." })
    }


    const tweet = tweetRepository.update(id, text);

    res.status(201).json(tweet);
}

export async function deleteTweet(req, res) {
    const id = req.params.id;
    const getId = tweetRepository.getById(id);

    if (!getId) {
        res.status(404).json({ message: "id가 존재하지 않습니다." });
    }
    console.log(getId.id + req.userId);


    if (getId.id !== req.userId) {
        res.status(403).json({ message: "id가 달라 수정권한이 없습니다." })
    }

    tweetRepository.remove(id);
    res.sendStatus(204).withMessage("삭제되었습니다.");
}

