const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    console.log(`Github TOKEN: ${GITHUB_TOKEN}`)
    const octokit = github.getOctokit(GITHUB_TOKEN);
    console.log(`Github octokit: ${octokit}`)
    console.log(octokit)

    const { context = {} } = github;
    const { pull_request } = context.payload;


    try {
        await octokit.rest.issues.createComment({
            ...context.repo,
            issue_number: pull_request.number,
            body: 'Thank you for submitting a pull request!'
        })
    } catch (error) {
        console.log(error)
    }
}

run();