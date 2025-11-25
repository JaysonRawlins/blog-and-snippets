---
title: "Use Fork Git Client to Remove Passwords from Git History"
date: Mon, 24 Nov 2025 10:52:25 +0000
description: ""
tags: ["git","fork","development"]
canonical: "https://dev.to/jjrawlins/use-fork-git-client-to-remove-passwords-from-git-history-3in"
---

> Original post on dev.to: https://dev.to/jjrawlins/use-fork-git-client-to-remove-passwords-from-git-history-3in

What is Fork
------------

Fork is a git client that runs your git commands for you inside of an interface. Similar to other products like GitHub Desktop abd GitKraken.

Why I like Fork
---------------

Fork UI provides a great deal of flexibility when setting up custom commands. The interface is decent and provides quick and easy GUI for all your Git needs.

However, being able to setup your client to run various commands on the repo is very handy.

Currently I have my JetBrain's products plus the ability to scan for secrets using nosey parker. All very very handy. I even use AICommit2 from time to time with a click of a button.

Meat and Potatoes
-----------------

Using fork to delete a file out of git history.

1.) Create a Custom Command

[![ ](https://d2qchn8kvos5rv.cloudfront.net/images/devto/b539a48373d7b911-cn25ivd5skyiehlici4r.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/b539a48373d7b911-cn25ivd5skyiehlici4r.png)

2.) Call the custom command 'Remove Selected File from History'

Target needs to be `File visible in file context menu`

[![Git Security](https://d2qchn8kvos5rv.cloudfront.net/images/devto/5b65ebfb42a5d235-ct40hocgd22rdv4r78cy.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/5b65ebfb42a5d235-ct40hocgd22rdv4r78cy.png)

3.) Select Bash Command

Add the following Script:  

    git filter-branch --force --index-filter "git rm --cached --ignore-unmatch '${file}'" --prune-empty --tag-name-filter cat -- --all && git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d && git reflog expire --expire=now --all && git gc --prune=now --aggressive
    

[![ ](https://d2qchn8kvos5rv.cloudfront.net/images/devto/eb863a63af92a0b1-7hwhmudg2zfdxh5wtky7.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/eb863a63af92a0b1-7hwhmudg2zfdxh5wtky7.png)

Now you can simply right click on the offending file and remove its entire history (remember to ignore the file so it doesn't get committed again).

[![ ](https://d2qchn8kvos5rv.cloudfront.net/images/devto/5a8cb74255182720-r42rhppw4z7hfb5fifgg.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/5a8cb74255182720-r42rhppw4z7hfb5fifgg.png)